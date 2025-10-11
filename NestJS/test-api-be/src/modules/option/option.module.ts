import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { OptionRepository } from './option.repositoy';

@Module({
  providers: [OptionService, OptionRepository],
  controllers: [OptionController]
})
export class OptionModule {}
