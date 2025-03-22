const deps = new Map()

export type Signal<T> = [accessor: () => T, setter: (newVal: T) => void]

export function useSignal<T>(initialVal: T): Signal<T> {
  if (!deps.has("a")) {
    deps.set("a", initialVal)
  }

  return [() => deps.get("a"), (newVal: T) => deps.set("a", newVal)]
}

export function useEffect(fn: () => void) {
  fn()
}

// For testing
const button = document.createElement("button")
const [count, setCount] = useSignal(0)
const handleClick = () => setCount(count() + 1)
useEffect(() => (button.textContent = `Click ${count()}`))
button.onclick = handleClick
document.body.append(button)
