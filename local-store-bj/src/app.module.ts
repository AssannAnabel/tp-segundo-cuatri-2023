import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryController } from './inventory/inventory.controller';
import { InventaryService } from './inventory/inventory.service';

@Module({
  imports: [],
  controllers: [AppController, InventoryController],
  providers: [AppService, InventaryService],
})
export class AppModule {}
