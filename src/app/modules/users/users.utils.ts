import usersService from './users.service'

const generateStudentId = async (): Promise<string> => {
  let incremental = 1
  const lastStudentId = await usersService.findLastUserId()
  if (lastStudentId) {
    const lastIncremental = parseInt(lastStudentId.split('-')[2])
    incremental = lastIncremental + 1
  }
  const currentYear = new Date().getFullYear()
  const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3)
  const incrementalString = String(incremental).padStart(4, '0')
  const studentId = `${currentYear}-${currentQuarter}-${incrementalString}`
  console.log('Generated Student ID:', studentId)
  return studentId
}

export default {
  generateStudentId,
}
