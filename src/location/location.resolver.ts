import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { Location } from './entities/location.entity';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser, UserLogin } from 'src/auth/current-user.decotator';

@Resolver(() => Location)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) { }

  @Roles([Role.ADMIN])
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Location)
  createLocation(
    @Args('createLocationInput') createLocationInput: CreateLocationInput,
    @CurrentUser() user: UserLogin
  ) {
    createLocationInput.createdBy = user.id;
    return this.locationService.create(createLocationInput);
  }

  @Query(() => [Location], { name: 'locations' })
  findAll() {
    return this.locationService.findAll();
  }

  @Query(() => Location, { name: 'location' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.locationService.findOne(id);
  }

  @Mutation(() => Location)
  updateLocation(@Args('updateLocationInput') updateLocationInput: UpdateLocationInput) {
    return this.locationService.update(updateLocationInput.id, updateLocationInput);
  }

  @Mutation(() => Location)
  removeLocation(@Args('id', { type: () => Int }) id: string) {
    return this.locationService.remove(id);
  }
}
