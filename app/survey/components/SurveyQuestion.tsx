import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function SurveyQuestion({ item }) {
  const { id, question, answers } = item
  return (
    <div>
      <p>{question}</p>
      <RadioGroup defaultValue=''>
        {answers.map((answer, index) => (
          <div
            key={`question_${id}_${index}`}
            className='flex items-center space-x-2'
          >
            <RadioGroupItem value={answer} id={index} />
            <Label htmlFor={index}>{answer}</Label>
          </div>
        ))}

        {/* <div className='flex items-center space-x-2'>
        <RadioGroupItem value='2' id='2' />
        <Label htmlFor='2'>2</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='3' id='3' />
        <Label htmlFor='3'>3</Label>
      </div> */}
      </RadioGroup>
    </div>
  )
}
