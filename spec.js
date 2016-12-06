var todoText=element(by.model('newTodo'));
var todoCount=element(by.css('strong.ng-binding'));
var todoButtonAll=element( by.xpath( '//*[@id="filters"]/li[1]/a'));
var todoButtonActive=element( by.xpath( '//*[@id="filters"]/li[2]/a'));
var todoButtonCompleted=element( by.xpath( '//*[@id="filters"]/li[3]/a'));

 describe('Test Suite- Todo: ', function() {
   
  it('TC1:Test for adding tasks', function() {
    browser.get('http://todomvc.com/examples/angularjs/#/');
      
    for (var i = 1; i <= 6; i++) {
    todoText.sendKeys('todo'+i);
    todoText.sendKeys(protractor.Key.ENTER);
    }
    //Validation to check if 6 tasks are added or not
    expect(todoCount.getText()).toEqual('6');
   });

  it('TC2:Test for removing a task with X',function(){
    // this is for hover over the mouse
     
    var removeTodo = element( by.xpath( '//*[@id="todo-list"]/li[6]/div/label'));
    browser.actions().mouseMove( removeTodo ).perform();
     
    //this is for deleting 6th task by clicking X button from 6 tasks
    element( by.xpath('//*[@id="todo-list"]/li[6]/div/button')).click();
    expect(todoCount.getText()).toEqual('5');
     
    });

  it('TC3:Test for selecting tasks',function(){

    //Mark completed as 1 and 3
    browser.actions().mouseMove( element( by.xpath( '//*[@id="todo-list"]/li[1]/div/input')) ).perform();
    element( by.xpath( '//*[@id="todo-list"]/li[1]/div/input')).click();
    
    browser.actions().mouseMove( element( by.xpath( '//*[@id="todo-list"]/li[3]/div/input')) ).perform();
    element( by.xpath( '//*[@id="todo-list"]/li[3]/div/input')).click();

    expect(todoCount.getText()).toEqual('3');
     
  });


  it('TC4:Test for Validating completed tasks',function(){
    //Checking here from clicking completed button to know what tasks are completed
    browser.actions().mouseMove( todoButtonCompleted ).perform();
 
    todoButtonCompleted.click();
    
    expect(todoCount.getText()).toEqual('3');
    //checking task1&3 tasks are presented or not  
    expect(element( by.xpath( '//*[@id="todo-list"]/li[1]/div/label')).getText()).toEqual('todo1');
    expect(element( by.xpath( '//*[@id="todo-list"]/li[2]/div/label')).getText()).toEqual('todo3');
    
  });

 it('TC5:Test for validating Currently Active tasks',function(){
    //Checking what are the tasks in the active or not by clicking Active
    browser.actions().mouseMove( todoButtonActive ).perform();
  
    todoButtonActive.click();

    expect(todoCount.getText()).toEqual('3');
    //Active task 2,4,5
    expect(element( by.xpath( '//*[@id="todo-list"]/li[1]/div/label')).getText()).toEqual('todo2');
    expect(element( by.xpath( '//*[@id="todo-list"]/li[2]/div/label')).getText()).toEqual('todo4');
    expect(element( by.xpath( '//*[@id="todo-list"]/li[3]/div/label')).getText()).toEqual('todo5');
   
  });


it('TC6:Test for validating All  tasks',function(){
     
    browser.actions().mouseMove( todoButtonAll ).perform();
    //By clicking check all button
    todoButtonAll.click();
    //Checking which check box is selected and not selected
    expect(todoCount.getText()).toEqual('3');
    expect(element( by.xpath('//*[@id="todo-list"]/li[1]/div/input')).isSelected()).toBe(true);
    expect(element( by.xpath('//*[@id="todo-list"]/li[2]/div/input')).isSelected()).toBe(false);
    expect(element( by.xpath('//*[@id="todo-list"]/li[3]/div/input')).isSelected()).toBe(true);
    expect(element( by.xpath('//*[@id="todo-list"]/li[4]/div/input')).isSelected()).toBe(false);
    expect(element( by.xpath('//*[@id="todo-list"]/li[5]/div/input')).isSelected()).toBe(false);
    
  });


it('TC7:Test for validating if all tasks are completed',function(){
    // Testing all the tasks are selected or not
    var allChecked = element( by.xpath( '//*[@id="toggle-all"]'));
    browser.actions().mouseMove( allChecked ).perform();
    
    allChecked.click();
    // expecting the value which are done if so it should be 0
    expect(todoCount.getText()).toEqual('0');
    
  });

it('TC8:Test for validating clear all completed',function(){
    //click the to do button all 
    todoButtonAll.click();
     
    browser.actions().mouseMove( element( by.xpath( '//*[@id="clear-completed"]')) ).perform();
    //Clicking clear all completed     
    element( by.xpath( '//*[@id="clear-completed"]')).click();
    expect(element(by.xpath( '//*[@id="todo-list"]/li[1]')).isPresent()).toBe(false);
     
  });


});
 



