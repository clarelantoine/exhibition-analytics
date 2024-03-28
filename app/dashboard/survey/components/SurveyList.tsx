import { getSurveyList } from '../actions/getSurveyList.action'
import SurveyCard from './SurveyCard'

export interface SurveyData {
  survey_id: number
  title: string
  description: string
  created_at: string
}

export default async function SurveyList() {
  const surveyList: SurveyData[] = await getSurveyList()

  return surveyList.length > 0 ? (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {surveyList.map(survey => (
        <SurveyCard key={survey.survey_id} item={survey} />
      ))}
    </div>
  ) : (
    <p>no surveys</p>
  )
}
