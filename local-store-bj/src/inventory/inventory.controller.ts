import { Controller,Get,Post,Put,Delete,Param,Body,Res,HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { InventaryService } from './inventory.service';
import {Inventory} from './inventory.interface';
import { Response } from 'express';


@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventaryService:InventaryService){}

    @Get()
    async getInvtry(@Res() res:Response) {
       try{
       const serviceRes = await this.inventaryService.getInvtry()
        return res.status(HttpStatus.OK).send(serviceRes);
    } catch(error){
        throw new NotFoundException('data not found');
    }
}


    @Get(':id')
     async getInvtryById(@Param('id') id: number,@Res() res:Response) {
        try{
         const serviceRes= await this.inventaryService.getInvtryById(id);
         if(serviceRes.success){
            return res.status(HttpStatus.OK).send(serviceRes)
         } else{
            return res.status(HttpStatus.NOT_FOUND).send(serviceRes)
         }
        } catch (error){
        throw new BadRequestException(`cannot get inventory with id ${id}`)
    }
}
    @Post()
    async createInvtry(@Body() invtry: Inventory,@Res() res:Response) {
        try{
        const serviceRes= await this.inventaryService.createInvtry(invtry)
      return res.status(HttpStatus.CREATED).send({message:'created'}) // este mensaje no lo veo
        } catch(error){
    throw new BadRequestException('inventory creation failed')
}
    }

    @Delete(':id')
    async deleteInvtryById(@Param ('id')id: number, @Res() res:Response) {
        try{
            const serviceRes= await this.inventaryService.getInvtryById(id);
            if(serviceRes.success){
                return res.status(HttpStatus.OK).send({...serviceRes})
            } else{
                return res.status(HttpStatus.NOT_FOUND).send({...serviceRes})
            }
    } catch (error){
        throw new NotFoundException ('Delete failed')
    }
    }
    
    @Put(':id')
    updateInvtryById(@Param('id') id: number, @Body() invtry: Inventory) {
        return this.inventaryService.updateInvtryById(id, invtry)
    }



}