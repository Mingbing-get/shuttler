const colorList: string[][] = [
  ['#1D2129', '#4E5969', '#86909C', '#C9CDD4', '#F2F3F5'],
  ['#4D2D00', '#A26D0A', '#F7BA1E', '#FADC6D', '#FDF4BF'],
  ['#4D0E00', '#A23511', '#F77234', '#FAAC7B', '#FDDDC3'],
  ['#4D0020', '#811C40', '#B6506D', '#D38596', '#F0C4CB'],
  ['#4D000A', '#A1151E', '#F53F3F', '#F98981', '#FDCDC5'],
  ['#4D0034', '#A11069', '#F5319D', '#F979B7', '#FDC2DB'],
  ['#16004D', '#3C108F', '#722ED1', '#A871E3', '#DDBEF6'],
  ['#000D4D', '#072CA6', '#165DFF', '#6AA1FF', '#BEDAFF'],
  ['#00424D', '#07828B', '#14C9C9', '#5EDFD6', '#B7F4EC'],
  ['#004D1C', '#008026', '#00B42A', '#4CD263', '#AFF0B5'],
  ['#2E4D00', '#3F5416', '#505C30', '#939D6A', '#D9DEB9'],
]

const presetColors: string[] = []
for (let i = 0; i < 5; i++) {
  colorList.forEach((single) => {
    presetColors.push(single[i])
  })
}

export default presetColors
