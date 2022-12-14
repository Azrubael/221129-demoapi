/* Класс в JavaScript - 'синтаксический сахар', поэтому в качестве декоратора
   создается простаа функция, у которой один агрумент типа 'Function'
*/
function Component(id: number) {
   console.log('decorator @Component init')
   return (target: Function) => {
      console.log('decorator @Component run')
      target.prototype.id = id
   }
}

function Logger() {
   console.log('decorator @Logger init')
   return (target: Function) => {
      console.log('decorator @Logger run')
   }
}

function Method(
   target: Object,
   propertyKey: string,
   propertyDescriptor: PropertyDescriptor
) {
   console.log(propertyKey)
   propertyDescriptor.value = function (...args: unknown[]) {
      if (typeof(args[0]) == 'number') {
        return args[0] * 10 
      }
   }
}

function Prop(
   target: Object,
   propertyKey: string
) {
   let value: number

   function getter() {
      console.log('Get value = '+ value)
      return value
   }

   function setter(newValue: number) {
      value = newValue
      console.log('Set value = '+ value)
      return newValue
   }

   Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter
   })
}

function Param(
   target: Object,
   propertyKey: string,
   index: number
) {
   console.log(`Param console.log: propertyKey= ${propertyKey} ; index= ${index}`)
}

@Logger()                      // первый декоратор на класс
@Component(39)                 // второй декоратор на класс
export class User {
   @Prop id: number            // декоратор на свойство

   @Method                     // декоратор на метод
   updateId(@Param newId: number) {   // декоратор на параметр
      this.id = newId
      return this.id
   }
}

console.log(new User().id)
console.log(new User().updateId(2))