import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true }) // Agrega createdAt y updatedAt
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    age: number;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, minlength: 6 })
    password: string;

    @Prop({ type: Types.ObjectId, ref: 'Tienda', default: null})
    tienda?: Types.ObjectId;

}

export const UserSchema = SchemaFactory.createForClass(User)