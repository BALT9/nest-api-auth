import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ProductoDocument = HydratedDocument<Producto>;

@Schema({ timestamps: true })
export class Producto {
    @Prop({ required: true })
    title: string;

    @Prop()
    description?: string;

    @Prop({ required: true })
    price: number;

    @Prop()
    imageUrl?: string;

    @Prop({ default: 0 })
    stock: number;

    // Relación: cada producto pertenece a una tienda
    @Prop({ type: Types.ObjectId, ref: 'Tienda' })
    store?: Types.ObjectId;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
