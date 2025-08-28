export default function generateId(pre: string = 'd') {
  return `${pre}_${crypto.randomUUID()}`
}
