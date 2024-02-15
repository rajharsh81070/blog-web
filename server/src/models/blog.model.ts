import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Ref,
  Severity,
} from '@typegoose/typegoose'
import { User } from './user.model'

@pre<Blog>('save', async function (next) {
  this.id = this._id
  next()
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Blog {
  @prop()
  id: string

  @prop({ required: true })
  content: string

  @prop({ required: true })
  title: string

  @prop({ required: true, ref: () => User })
  user: Ref<User>
}

const blogModel = getModelForClass(Blog)
export default blogModel
