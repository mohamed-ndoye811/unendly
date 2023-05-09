interface Card {
  id: number
  level: number
  question: string
  answer: string
  categ: string
  theme: string
  revealed: boolean
  studied: boolean
  dateOfStudy: string
}


export type {
  Card
}