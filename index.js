const backpackSize = 25
const backpacksNum = 10
let backpacks = [...Array(backpacksNum)].map(() => [])

const itemsNum = 50;
const items = [...Array(itemsNum)].map((_, i) => ({
  id: i,
  value: Math.floor(Math.random() * 100),
  weight: Math.floor(Math.random() * 10),
}))

const getWeight = (backpack) => {
  return backpack.reduce((prev, curr) => prev + curr.weight, 0)
}

const getValue = (backpack) => {
  return backpack.reduce((prev, curr) => prev + curr.value, 0)
}

const getUnusedItems = (backpack) => {
  return [...items].filter(i => !backpack.find(item => item.id === i.id))
}

const isFull = (backpack) => {
  return backpack.reduce((prev, curr) => prev + curr.weight, 0) >= backpackSize
}

const fillBackpack = (backpack) => {
  while((!isFull(backpack))) {
    const unusedItems = getUnusedItems(backpack)
    const index = Math.floor(Math.random() * unusedItems.length)
    const item = unusedItems[index]

    backpack.push(item)
  }

  if(getWeight(backpack) > backpackSize)
    backpack.pop()

  return backpack
}

const fillBackpacks = (backpacks) => {
  return [...backpacks].map(fillBackpack)
}

const swapItems = (backpack, delta) => {
  [...Array(Math.floor(backpack.length * delta))]
    .forEach(() => {
      backpack.splice(Math.floor(Math.random() * backpack.length), 1)
    })

  return fillBackpack(backpack)
}

const swapItemsAllBackpacks = (backpacks) => {
  return [...backpacks].map((b, i) => {
    return i === 0
      ? b
      : swapItems(b, 0.5)
  })
}

const getBest = (backpacks) => {
  return backpacks.reduce((prev, current) => {
    return getValue(prev) > getValue(current)
      ? prev
      : current
  })
}


backpacks = fillBackpacks(backpacks);

[...Array(50)].forEach(() => {
  const best = getBest(backpacks)

  backpacks = backpacks.map(() => [...best])
  backpacks = swapItemsAllBackpacks(backpacks)
})

const best = getBest(backpacks)
const value = getValue(best)
const weight = getWeight(best)

console.log('Items')
console.log(items)
console.log('---------------')
console.log('Best Backpack')
console.log(best)

console.table({
  value: value,
  weight: weight
})

