import { connectToDatabase } from '../util/mongodb'
import { CommonModel } from '../interfaces/index'

export async function getCommonData (lang: string): Promise<CommonModel> {
  // data found in all pages (layout data)

  const { db } = await connectToDatabase()
  const [common]: CommonModel[] = await db.collection('common').find({ lang }).toArray()
  const data: CommonModel = await JSON.parse(JSON.stringify(common))

  return data
}
