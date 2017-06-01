describe("UK Weather Extremes", function() {

  describe("apigetdata.js retreives JSON objects from metOffice Datapoint service", function() {

    beforeAll(function(done) {
      setTimeout(function() {
         value = 2000;
         done();
      }, 1000);
    });

    describe("getExtremesData()", function() {

      it("should return an object from the API call", function() {
        expect(Object.prototype.toString.call(metOfficeData.extremesData)).toEqual("[object Object]");
      });

      it("should return an object which is not empty", function() {
        expect(Object.keys(metOfficeData.extremesData).length).not.toEqual(0);
      });

    });

    describe("getObservationsSiteList()", function() {

      it("should return an object from the API call", function() {
        expect(Object.prototype.toString.call(metOfficeData.observationSiteList)).toEqual("[object Object]");
      });

      it("should return an object which is not empty", function() {
        expect(Object.keys(metOfficeData.observationSiteList).length).not.toEqual(0);
      });

    }); 

  });

  describe("app.js", function() {

    describe("createRegionObject()", function() {

      it("should return an object", function() {
        expect(Object.prototype.isPrototypeOf(weatherApp.createRegionObject('UK'))).toEqual(true);
      });

      it("should return an object whose region property equals the argument called to the function", function() {
        expect(weatherApp.createRegionObject('UK').region).toEqual('UK');
      });

      it("should return an object with 4 properties", function() {
        expect(Object.keys(weatherApp.createRegionObject('UK')).length).toEqual(4);
      });     

      it("should return an object with 'extremes' as a nested object", function() {
        expect(Object.prototype.toString.call(weatherApp.createRegionObject('UK').extremes)).toEqual("[object Object]");
      }); 

      it("should nest HMAXT, HRAIN, HSUN, LMAXT, LMINT properties in the extremes nested object", function() {
        expect(Object.prototype.toString.call(weatherApp.createRegionObject('UK').extremes.HMAXT)).toEqual("[object Object]");
        expect(Object.prototype.toString.call(weatherApp.createRegionObject('UK').extremes.HRAIN)).toEqual("[object Object]");
        expect(Object.prototype.toString.call(weatherApp.createRegionObject('UK').extremes.HSUN)).toEqual("[object Object]");
        expect(Object.prototype.toString.call(weatherApp.createRegionObject('UK').extremes.LMAXT)).toEqual("[object Object]");
        expect(Object.prototype.toString.call(weatherApp.createRegionObject('UK').extremes.LMAXT)).toEqual("[object Object]");
      });

      it("should return an object where the date, issuedAt, region properties are strings", function() {
        expect(typeof weatherApp.createRegionObject('UK').date).toEqual('string');
        expect(typeof weatherApp.createRegionObject('UK').issuedAt).toEqual('string');
        expect(typeof weatherApp.createRegionObject('UK').region).toEqual('string');
      });

    });

  });  

});

  // describe("app.model.addTodo()", function() {

  //   beforeEach(function() {
  //     todoApp.model.addTodo("Specified text");
  //   });

  //   afterEach(function() {
  //     todoApp.model.todos = [];
  //   });    

  //   it("should add a todo to the array", function() {
  //     expect(todoApp.model.todos.length).toEqual(1);
  //   });

  //   it("should contain a todotext property equal to addTodo's argument", function() {
  //     expect(todoApp.model.todos[0].todoText).toEqual("Specified text");
  //   });  

  //   it("should contain a completed property which defaults to false", function() {
  //     expect(todoApp.model.todos[0].completed).toEqual(false);
  //   });        

  // });

  // describe("app.model.addTodo()", function() {

  //   beforeEach(function() {
  //     todoApp.model.addTodo("First todo");
  //   });

  //   afterEach(function() {
  //     todoApp.model.todos = [];
  //   });    

  //   it("should delete a todo from the array", function() {
  //     todoApp.model.deleteTodo(0);
  //     expect(todoApp.model.todos.length).toEqual(0);
  //   });

  //    it("should delete the todo with the specified index number", function() {
  //     todoApp.model.addTodo("Do not delete me");
  //     todoApp.model.deleteTodo(0);
  //     expect(todoApp.model.todos.length).toEqual(1);
  //     expect(todoApp.model.todos[0].todoText).toEqual("Do not delete me");
  //   });   

  // });

  // describe("app.model.editTodoText()", function() {

  //   it("change the todo text to the specified text", function() {
  //     todoApp.model.addTodo("First todo");
  //     todoApp.model.editTodoText(0, "Edited todo");
  //     expect(todoApp.model.todos[0].todoText).toEqual("Edited todo");
  //   });

  //   afterEach(function() {
  //     todoApp.model.todos = [];
  //   }); 

  // });

  // describe("app.model.toggleCompleted()", function() {

  //   it("change the completed property to the opposite boolean value it was before", function() {
  //     todoApp.model.addTodo("First todo");
  //     expect(todoApp.model.todos[0].completed).toEqual(false);
  //     todoApp.model.toggleCompleted(0);
  //     expect(todoApp.model.todos[0].completed).toEqual(true);
  //     todoApp.model.toggleCompleted(0);
  //     expect(todoApp.model.todos[0].completed).toEqual(false);
  //   });

  //   afterEach(function() {
  //     todoApp.model.todos = [];
  //   }); 

  // });

  // describe("app.model.removeCompleted()", function() {

  //   beforeEach(function() {
  //     todoApp.model.addTodo("This todo is completed");
  //     todoApp.model.todos[0].completed = true;
  //     todoApp.model.addTodo("This todo is not completed");
  //   });

  //   afterEach(function() {
  //     todoApp.model.todos = [];
  //   });    

  //   it("deletes todos with completed: true", function() {

  //     todoApp.model.removeCompleted();
  //     expect(todoApp.model.todos.length).toEqual(1);
  //     expect(todoApp.model.todos[0].completed).toEqual(false);
  //   });

  // });

  // describe("app.model.toggleAll()", function() {

  //   beforeEach(function() {
  //     todoApp.model.addTodo("First todo");
  //     todoApp.model.addTodo("Second todo");
  //   });

  //   afterEach(function() {
  //     todoApp.model.todos = [];
  //   });    

  //   it("makes all todos completed = true if all were false before", function() {

  //     todoApp.model.toggleAll()
  //     expect(todoApp.model.todos[0].completed).toEqual(true);
  //     expect(todoApp.model.todos[1].completed).toEqual(true);
  //   });

  //   it("makes all todos completed = true if at least one was false before", function() {

  //     todoApp.model.todos[0].completed = true;
  //     todoApp.model.toggleAll()
  //     expect(todoApp.model.todos[0].completed).toEqual(true);
  //     expect(todoApp.model.todos[1].completed).toEqual(true);
  //   });

  //   it("makes all todos completed = false if all were true before", function() {

  //     todoApp.model.todos[0].completed = true;
  //     todoApp.model.todos[1].completed = true;
  //     todoApp.model.toggleAll()
  //     expect(todoApp.model.todos[0].completed).toEqual(false);
  //     expect(todoApp.model.todos[1].completed).toEqual(false);
  //   });    

  // });