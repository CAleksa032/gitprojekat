export class Teacher{
    username: string = ''
    password: string = ''
    name: string = ''
    lastname: string = ''
    gender: string = ''
    address: string = ''
    phone: string = ''
    email: string = ''
    schoolType: string = ''
    currentGrade: string = ''
    profilePicture: Buffer = Buffer.alloc(0)
    type: string = ''
    selectedSubjectsList: string[] = []
    selectedAgeGroupsList: string[] = []
    source: string = ''
    cvFile: string = ''
    approval: number = 0
}