import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Tienda, TiendaDocument } from './schemas/tienda.schema';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { UpdateTiendaDto } from './dto/update-tienda.dto';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class TiendasService {
  constructor(
    @InjectModel(Tienda.name) private tiendaModel: Model<TiendaDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async create(createTiendaDto: CreateTiendaDto, ownerId: string): Promise<Tienda> {
    console.log('ownerId recibido:', ownerId);
    const ownerExists = await this.userModel.findById(ownerId);
    console.log('ownerExists:', ownerExists);
    if (!ownerExists) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const existingTienda = await this.tiendaModel.findOne({ owner: ownerId }).exec();
    if (existingTienda) {
      throw new ConflictException('Este usuario ya tiene una tienda');
    }

    const newTienda = new this.tiendaModel({
      ...createTiendaDto,
      owner: new Types.ObjectId(ownerId),
      products: [],
    });

    try {
      const savedTienda = await newTienda.save();

      await this.userModel.findByIdAndUpdate(ownerId, { tienda: savedTienda._id });

      return savedTienda;
    } catch (error) {
      if (error.code === 11000) { // Error de duplicado
        throw new ConflictException('Este usuario ya tiene una tienda');
      }
      throw error;
    }
  }

  async findAll(): Promise<Tienda[]> {
    return this.tiendaModel.find().populate('owner').populate('products').exec();
  }

  async findOne(id: string): Promise<Tienda> {
    const tienda = await this.tiendaModel.findById(id).populate('owner').populate('products').exec();
    if (!tienda) {
      throw new NotFoundException(`Tienda con id ${id} no encontrada`);
    }
    return tienda;
  }

  async update(id: string, updateTiendaDto: UpdateTiendaDto): Promise<Tienda> {
    const updatedTienda = await this.tiendaModel
      .findByIdAndUpdate(id, updateTiendaDto, { new: true })
      .exec();
    if (!updatedTienda) {
      throw new NotFoundException(`Tienda con id ${id} no encontrada`);
    }
    return updatedTienda;
  }

  async remove(id: string): Promise<Tienda> {
    const deletedTienda = await this.tiendaModel.findByIdAndDelete(id).exec();
    if (!deletedTienda) {
      throw new NotFoundException(`Tienda con id ${id} no encontrada`);
    }
    return deletedTienda;
  }
}
