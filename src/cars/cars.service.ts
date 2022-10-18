import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        /* {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        } */
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(car => car.id === id);

        if (!car) throw new NotFoundException(`Car with id '${ id }' not found`);

        return car;
    }

    create(createCarDto: CreateCarDto) {

        const newCar: Car = {
            id: uuid(),
            ...createCarDto
        };
        
        this.cars.push(newCar);

        return newCar;
    }

    update(id: string, updateCarDto: UpdateCarDto) {
        
        let carDB = this.findOneById(id);

        //En caso de que el Id venga en el body y sea distinto del Id de la query, se lanza la excepción
        if (updateCarDto.id && updateCarDto.id !== id)
            throw new BadRequestException(`Car Id is not valid inside body`);

        this.cars = this.cars.map(car => {
            if (car.id === id) {
                carDB = {
                    ...carDB,         //tendrá sus propias propiedades (esparce sus propias propiedades, las originales)
                    ...updateCarDto,  //sobrescribe las propiedades anteriores, actualizadas con lo que viene del DTO
                    id                //sobreescribe el id por el original, en caso de que el id del DTO sea distinto (podría venir distinto en el body del request)
                }

                return carDB;
            }

            return car;
        });

        return carDB;
    }

    delete(id: string) {

        const carDB = this.findOneById(id);
        this.cars = this.cars.filter(car => car.id !== id);
    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }
}
