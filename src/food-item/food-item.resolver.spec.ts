import { Test, TestingModule } from '@nestjs/testing';
import { FoodItemResolver } from './food-item.resolver';
import { FoodItemService } from './food-item.service';

describe('FoodItemResolver', () => {
  let resolver: FoodItemResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodItemResolver, FoodItemService],
    }).compile();

    resolver = module.get<FoodItemResolver>(FoodItemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
