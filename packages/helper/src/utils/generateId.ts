export default function generateId(pre: string = 'd') {
  return `${pre}_${performance.now().toString(36).replace('.', '')}_${Math.random().toString(36).substring(2)}`
}
