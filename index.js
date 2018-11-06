// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }
  customers(){
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }
  meals(){
    let uniqueMeals = [];
    let allMeals = store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
    for (let i = 0; i < allMeals.length; i++){
      if (i < (allMeals.length - 1) && allMeals[i].mealId !== allMeals[i + 1].mealId){
        uniqueMeals.push(allMeals[i])
      } else if (i === (allMeals.length - 1)) {
        uniqueMeals.push(allMeals[i])
      }
    }
    return uniqueMeals
  }
}

class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }
  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }
  static byPrice(){
    return store.meals.sort((a, b) => b.price - a.price)
  }
}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }
  meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }
  totalSpent(){
    let totalPrice = 0
    store.deliveries.forEach(delivery => {
      if (delivery.customerId === this.id){
        totalPrice = (totalPrice + delivery.meal().price)
      }
    })
    return totalPrice
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }
  customer() {
    return store.customers.find(meal => {
      return meal.id === this.customerId
    })
  }
  neighborhood() {
    return store.neighborhoods.find(meal => {
      return meal.id === this.neighborhoodId
    })
  }
}
