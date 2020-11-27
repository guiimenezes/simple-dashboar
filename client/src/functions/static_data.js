export const getNomeTipo = (value) => {
  // // SOLUÇÂO 1
  // let nome_tipo = ''
  // if (value === 1) {
  //   nome_tipo = 'Administrador'
  // } else if (value === 2) {
  //   nome_tipo = 'Gerente'
  // } else if (value === 3) {
  //   nome_tipo = 'Funcionário'
  // }
  // return nome_tipo
  const arr = ['Administrador', 'Gerente', 'Funcionário']
  return arr[value - 1]
}

export const getNomeTipoLabel = (value) => {
  const arr = ['primary', 'default', 'secondary']
  return arr[value - 1]
}
