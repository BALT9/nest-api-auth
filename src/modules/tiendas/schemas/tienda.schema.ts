import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TiendaDocument = HydratedDocument<Tienda>;

@Schema({ timestamps: true })
export class Tienda {
    @Prop({ required: true })
    name: string;

    // pertenece a un user 
    @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
    owner: Types.ObjectId;

    // tiene muchos productos
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Producto' }], default: [] })
    products: Types.ObjectId[];
}

export const TiendaSchema = SchemaFactory.createForClass(Tienda);