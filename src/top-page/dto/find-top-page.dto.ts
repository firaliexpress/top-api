import { IsEnum } from 'class-validator';
import { TopLevelCatogory } from '../top-page.model';

export class FindTopPageDto {
  @IsEnum(TopLevelCatogory)
  firstCategory: TopLevelCatogory;
}