import { Question } from '@/stores/QuestionStore';

const mockQuestionDetail = `
# นายกีรติกรกับก๋วยเตี๋ยวของเขา

นาย A อยากกินก๋วยเตี๋ยว ต้องเขียนโค้ดแบบไหนโดยใช้ **Graph algorithm** ในการจำลองการเดินทางไปกินก๋วยเตี๋ยวเส้นเล็กบะหมี่น้ำตกไม่ใส่ผัก

> โดย 1+1 ต้องเท่ากับ 2 ลูกชิ้นหมูเป็นลูกชิ้นไก่ หมูสับไข่ต้มยางมะตูม ผักกาดมะเขือเทศ

#### ***ข้อห้าม***
- **ห้ามเดินเลี้ยวขาวเลี้ยวซ้ายติดกัน เดียวล้ม**
- **ห้ามกินเหลือ**
- ห้ามอะไรก็ได้แต่อย่าห้ามผมขอเงินแม่

### ตัวอย่างผลการทำงาน

| Input | Output |
| ----- | ------ |
| ลูกชิ้น  | หมู     |
| ไก่    | ผัก     |
`;

export const mockQuestions: Question[] = [
  {
    id: 1,
    title: 'Porama walker',
    description: 'The hardest path algorithm ever',
    detail: mockQuestionDetail,
    level: 'hard',
    status: 'wait',
    lastSubmitted: new Date(),
  },
  {
    id: 2,
    title: 'Keeratikorn Eating',
    description: 'The easiest noodle algorithm',
    detail: mockQuestionDetail,
    level: 'easy',
    status: 'done',
    lastSubmitted: new Date(),
  },
  {
    id: 3,
    title: 'Chicken',
    description: 'Need to eat a chicken before code',
    detail: mockQuestionDetail,
    level: 'easy',
    status: 'error',
    lastSubmitted: new Date(),
  },
  {
    id: 4,
    title: 'Noodle',
    description: 'Need to eat a chicken before code',
    detail: mockQuestionDetail,
    level: 'medium',
    status: 'todo',
    lastSubmitted: new Date(),
  },
];
