import { getPatrimonials, runPatrimonial, getAcademics, runAcademic} from '@/api/declaracion'

const declaracion = {
  state: {
    tipo: ''
  },

  mutations: {
  },

  actions: {
    getAcademicos ({ commit }) {
      return new Promise((resolve, reject) => {
        getAcademics().then(response => {
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    runAcademico ({ commit }) {
      return new Promise((resolve, reject) => {
        runAcademic().then(response => {
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    getPatrimoniales ({ commit }) {
      return new Promise((resolve, reject) => {
        getPatrimonials().then(response => {
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    runPatrimonial ({ commit }) {
      return new Promise((resolve, reject) => {
        runPatrimonial().then(response => {
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
}

export default declaracion
