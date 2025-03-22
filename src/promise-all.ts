function myPromiseAll<T>(tasks: Promise<T>[]) {
  return new Promise((resolve, reject) => {
    const resolved: any[] = []
    const rejected: any[] = []

    tasks.forEach((t) => {
      t.then((d) => resolved.push(d)).catch((e) => rejected.push(e))
    })

    // TODO: fail to reject
    if (rejected.length > 0) {
      reject(rejected[0])
    } else {
      resolve(resolved)
    }
  })
}

async function tests() {
  const examples1 = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]

  console.log("all resolved =====")
  console.log(await myPromiseAll(examples1))

  try {
    const examples2 = [
      Promise.resolve(1),
      Promise.reject(2),
      Promise.resolve(3),
    ]

    console.log("one reject =====")
    console.log(await myPromiseAll(examples2))
  } catch (e) {
    console.log("one reject catch =====")
    console.log(e)
  }

  try {
    const examples3 = [Promise.reject(1), Promise.reject(2), Promise.resolve(3)]

    console.log("two reject =====")
    console.log(await myPromiseAll(examples3))
  } catch (e) {
    console.log("two reject catch =====")
    console.log(e)
  }
}

tests()
