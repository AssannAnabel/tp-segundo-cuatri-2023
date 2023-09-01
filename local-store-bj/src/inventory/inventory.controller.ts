import { Controller,Get,Post,Put,Delete,Param,Body,Res,HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import {Inventory} from './inventory.interface';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService:InventoryService){}

    @Get()
    async getInvtry(@Res() res):Promise<Inventory[]>{
       try{
       const serviceRes = await this.inventoryService.getInvtry()
        return res.status(HttpStatus.OK).send(serviceRes);
    } catch(error){
        throw new NotFoundException('data not found');
        
    }
}
@Get(':id')
    async getInvtryById(@Param('id') id: number, @Res() res): Promise<Inventory> {
        try {
            const invtryResFromService = await this.inventoryService.getInvtryById(id);
            if (Object.keys(invtryResFromService).length) {
                return res.status(HttpStatus.OK).json(invtryResFromService);
            }
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: `El registro de inventario con id ${id} no existe`, error: 404 })
        }
    }
    @Post()
    async createInvtry(@Body() invtry: Inventory,@Res() res):Promise<Inventory> {
        try{
        const serviceRes= await this.inventoryService.createInvtry(invtry)
    return res.status(HttpStatus.CREATED).send(serviceRes)
        } catch(error){
    throw new BadRequestException('inventory creation failed')
}
    }

    @Delete(':id')
    async deleteInvtryById(@Param ('id') id: number, @Res() res) {
        try{
            const serviceRes= await this.inventoryService.deleteInvtryById(id);
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
    async updateInvtryById(@Param('id') id: number, @Body() invtry: Inventory,@Res() res) {
        try{
        const serviceRes= await this.inventoryService.updateInvtryById(id, invtry);
        if(serviceRes.success){
            return res.status(HttpStatus.OK).send({...serviceRes})
        } else{
            return res.status(HttpStatus.NOT_MODIFIED).send({...serviceRes})
        }
    }
        catch(error){
            throw new NotFoundException('modified')
    }
    }
}
