// Декоратор @Test предназначен для тестирования метаданных
import 'reflect-metadata'

function Inject(key: string) {
   return (target: Function) => {
      Reflect.defineMetadata(key, 1, target)
      const meta = Reflect.getMetadata(key, target)
      console.log('Output log of the metadata: ' + meta)

   }
}

function Prop(target: Object, name: string) {

}

@Inject('Key C')
export class C {
   @Prop prop: number
}