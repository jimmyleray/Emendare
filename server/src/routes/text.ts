// MongoDB models
import { Text } from '../models'

export const text = {
  path: 'text/:id',
  callback: async (req: any, res: any) => {
    const gettedText = await Text.model.findById(req.params.id)
    if (text) {
      res.end(gettedText.actual)
    } else {
      res.status(404).end()
    }
  }
}
