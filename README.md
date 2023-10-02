# An Introduction to Mongoose

This talk is going to assume you have the following installed:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en)

This talk uses:

- [MongoDB Atlas](https://www.mongodb.com/products/platform/cloud)

This talk expects you to have a base knowledge of:

- CLI
- JavaScript
- [MongoDB](https://github.com/ejparnell/intro-to-mongodb)

## Overview

Okie dokie, artichokes, let's come together and talk about [Mongoose](https://mongoosejs.com/). This talk will cover the following:

## Data Modeling

Before we can talk about Mongoose we need to talk about data modeling. So what is data modeling? Data modeling is how we define our datas structure provding a way to represent real-world entities, relationships, and attributes. Let's take a look at some key concepts of data modeling:

- Entities - Object or concepts in the real world that need to be represented in the database.
- Attributes - Properties or characteristics of enitities.
- Relationships - Describes how the enitities are related to one another.
- Constraints - Rules around data being inserted into the database.

There are a couple of different types of data modeling one can do. For this talk we are going to focus on logical data modeling. A logical data model is a data model that has entities, their attributes, and the relationships between the entities.

### ERDs

ERDs, or enitity relationship diagrams are a tool that data modelers use to model data. Let's model something to get a feel of how to build an ERD.

We first need a real world item that we want to model; let's say characters from the TV show Star Trek: Deep Space Nine.

1. What is the name of the enity we are modeling?

Names of enities should be the non pulural version of a word. Enities names should also have the first letter capitalized. This represents that this is a class and that there are going to be many instances on this enity.

We are modeling characters from the TV show Star Trek: Deep Space Nine. We are going to use the non plural version of characters, character, and then capitlize the first letter, Characters.

![ERD with Character Enity](assets/erd-character.png)

At the most basic an ERD is just a simple diagram with a square box and a label in the box that let's the user know what enity it represents.

2. What attributes do we want to track in our enity?

These are going to be our fields for our documents. Here is a good idea to think through your application and see what data you will need to store.

![Character Enity with attribute](assets/erd-attributes.png)

- firstName - Will hold the first name of the character.
- lastName - Will hold the last name of the character.
- age - Will hold the age of the character.
- isStarFleet - Will show is this character is in Star Fleet or not.
- department - Will show which department this character works in.

These are the attributes we want to track in this talk for a single character.

3. What value are these attributes going to hold and what, if any, rules do we want to put around them for validation?

We have five attributes that we want to track for this talk. But what value should these attributes hold? We want to think of this in the abstract and not put in actual values. Remember this is going to be a template for all documents in a collection.

![Character enity with field validation](assets/erd-constraits.png)

We can see that `firstName`, `lastName`, and `department` fields are expecting string values, `age` is expecting a number value, and `isStarFleet` is expecting a boolean value.

> *Note*: We will be adding a relationship later, but since we just have a single enity we are not going to diagram that relationship here. However we will diagram that relationship later in this talk.

## Mongoose

Mongoose is a database middleware for MongoDB that simplifies our interactions. If you followed along with my last talk [Intro to MongoDB](https://github.com/ejparnell/intro-to-mongodb) you know a couple of things about MongoDB:

- NoSQL document-orientated data database that allows us to store loosely related documents in collections.
- Does not require predetermined schemas for it's documents.
- Can use collection methods for CRUD operations.
- Stores documents as BSON objects.

So where does this Mongooese come into play? Since our documents do not require a predetermined schema we can have documents that have different field/value pairs. Let's take a look at an example of a collection in MongoDB:

```js
{
        name: 'Captian Benjamin Sisko',
        age: 43,
        isStarFleet: true,
    },
    {
        name: 'Odo',
        age: 11,
    },
    {
        name: 'Colonel Kira Nerys',
        age: 26,
    },
    {
        name: 'Quark',
        age: 36,
    }
```

Only the document with the field/value pair of `name: 'Captian Benjamin Sisko'` has the `isStarFleet: true,` field/value pair. MongoDB is totally fine with this. There is another thing that we have to worry about here as well. By default there is nothing stopping us from storing a number or boolean value in the `name` field. We could use MonogDB and set a predefined structure, making sure that all documents have the same field/value pairs and those field/value pairs have the expected data type. But here is where Mongoose makes our life easier. From the [Mongoose home page](https://mongoosejs.com/):

**Let's face it, writing MongoDB validation, casting and business logic boilerplate is a drag. That's why we wrote Mongoose.**

Using Mongoose will make our lifes easier when we are wanting to write validations, casting, and business logic in MongoDB.

## Mongoose Schemas

We should always start with a schema. What is a schema though? A schema is a blueprint that defines the structure of a MongoDB document in a collection. Here is where we take those data modeling skills from the above section and translate them to code.

![Character ERD](assets/erd-constraints.png)

We have this abstract Character enity with field/value pair. Let's translate that into JavaScript and implement the Mongoose library. Inside of `bin/models/character.js`:

```js
const mongoose = require('mongoose')

const { Schema } = mongoose

const characterSchema = new Schema({}, {})
```

- `const mongoose = require('mongoose')` - Requiring in the Mongoose library and saving it to a variable for easy use.
- `const { Schema } = mongoose` - We need the class of `Schema` so we can construct what our schema will look like.
- `const characterSchema = new Schema({}, {})` - Using the JavaScript keyword `new` we are creating a new instance of the schema class and calling it `characterSchema`.

In the above example we are passing the Mongoose Schema class two empty objects. The first empty object we are going to fill with our field/value pairs. The second, is optional and is for any options we want to use for these documents.

Let's take a look at the Mongoose documentation to see how we can build this schema. From the [Mongoose Guide](https://mongoosejs.com/docs/guide.html#definition):

```js
const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});
```

They are using a blog as their enity they are modeling. You can see that they are not passing in the second optional object parameter. The first parameter they are passing in is an object with key/values pairs that represent the field/value pair we want our documents to have in our collection.

But why the capital `S` with `String` or the capital `B` with `Boolean`? Does that matter? Yes it does! These are not just some arbitary value we are passing in these are [SchemaTypes](https://mongoosejs.com/docs/schematypes.html). SchemaTypes are built in object for Mongoose models, used to validate field/value pairs. Meaning that if we have declared `title`'s value should always be a string, and if we try to create a document with a number value in the `title`'s field we will get a validation error and the document will be prevented from being inserted.

Now let's apply the above learnings and further translate our ERD to Mongoose. Back inside of `bin/models/character.js`:

```js
const mongoose = require('mongoose')

const { Schema } = mongoose

const characterSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    isStarFleet: Boolean,
    department: String
}, {})
```

We have filled in that first parameter's object with our field/values pairs. Making sure to match the types with what is in our ERD. Let's start to take a look at that second parameter now. Like I said above this is where we can turn on options for our documents. One option that we should always turn on is time stamps. But what are time stamps? Time stamps are a field/value pair that is added to each of our documents on creation. This will include the creation time and once we update it, it will include the last time we updated that document.

Let's turn on time stamps. Back in `bin/models/character.js`:

```js
const mongoose = require('mongoose')

const { Schema } = mongoose

const characterSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    isStarFleet: Boolean,
    department: String
}, {
    timestamps: true
})
```

By default time stamps are not turned on so in the options parameter we just have to send instructions to turn it on: `timestamps: true`.

> *Note*: Full list of all options we can use in Mongoose is [here](https://mongoosejs.com/docs/guide.html#options)

## Mongoose Validation

As of right now we have a basic schema with no added validation. The only validation we have is making sure this if we insert a field we have declared that it is checked to be the correct data type. Right now we could create documents without any of these fields because none of them are required. Let's fix that. Back in `bin/models/character.js`:

```js
const mongoose = require('mongoose')

const { Schema } = mongoose

const characterSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    isStarFleet: {
        type: Boolean,
        required: true
    },
    department: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})
```

We first get rid of whatever was after our field declartion and add an object. In this object we still need to declare what type this field is going to hold. Next we use the `required` [built-in Mongoose validator](https://mongoosejs.com/docs/validation.html#built-in-validators) to make sure that a fields value is there when we try to create it.

We will break down just the `firstName` field/value pair:

- `type: String` - The type of value being stored in this field.
- `required: true` - Using the built-in Mongoose validator to make that this field is there on creation.

> *Note*: `required: true` is not required for Mongoose documents. You can leave this valiation off of the schema without causing any errors. However if you do you can create documents that missing field/value pairs. This might cause errors later in your application if you are expecting your data to be uniform.

The `required` built-in validator can be used on all SchemaTypes but Numbers and Strings have some other built-in validators that can only be used in that SchemaType.

Let's take a look at some of the [Numbers built-in validators](https://mongoosejs.com/docs/schematypes.html#number-validators): `min` and `max`.

- `min` - Declares the minumum value that can be stored at this field.
- `max` - Delcares the maxiumn value that can be stored at this field.

Back inside of `bin/models/character.js` let's update or `age` field to use these built-in validators:

```js
// Still inside of the Schema
age: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    }
```

Right under that univeral built-in validator of `required` we can delcare that the minumumn value (`min`) for age can be 1, so no negitive numbers; and the maximumn value (`max`) is set to 100. We have now made sure that this age field/value pair is required, and can only be a number value from 1 to 100. Pretty neat!

Now on to some of our [string built-in validators](https://mongoosejs.com/docs/schematypes.html#string-validators). We have `enum`, `lowercase`, `trim`, `minLength`, and `maxLength`.

- `enum` - A preditermined array of values this string can be.
- `lowercase` - Calls `.toLowerCase()` on the value.
- `minLength` - Checks the length of the string and verifies that it meets the minumn legth we specify.
- `maxLength` - Checks the length of the string and verifies that it is not over the maxiumn lenght we specify.

Back inside of our `bin/models/character.js` let's update some of the string fields to use some of these built-in validators:

```js
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 1,
        maxLength: 100
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 1,
        maxLength: 100
    },
// age and isStarFleet are still here but we are not changing those values right now
    department: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: ['command', 'security', 'medical']
    }
```

We are using `trim` and `lowercase` across all of our string fields to make sure our strings are consistant. We are also using the `minLength` and `maxLength` validators on our name fields. Lastly let's break down that `enum` field on the `department`.

We are saying here that the `department` field can only be one of three values: command, security, and medical. These are case sensitive as well so sense we are running the `lowercase` validator these values will need to be lowercase as well.

> *Note*: If the built-in validators are not enough for your application you can always create a [custom validator](https://mongoosejs.com/docs/validation.html#custom-validators).

## Mongoose Virtuals

We have a schema that has some validation now let's talk about virtuals. But what are these virtuals I speak of? Virtuals are document properties that we can get or set but do not persist in the database. These are great for constructing what we need without having to add it to our database.

Let's add a virtual that will get a documents full name. Back inside of our `bin/models/character.js`:

```js
characterSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
})
```

First we declare which schema or documents we want this virtual attached to. Here it's the `characterSchema` so our character documents will have access to this `fullName` functionality.

Next we name the virtual. We do this by passing in a string version of what we want to call this. Making sure not to include spaces for easy use. 

Then we use the 

## Mongoose Models
## Mongoose CRUD
### We do: Create
### You do: Create
### We do: Read
#### Index
#### Show
### You do: Read
### We do: Update
### You do: Update
### We do: Delete
### You do: Delete
