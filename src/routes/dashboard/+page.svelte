<script>
  let todoList = ["Do the groceries"];
  let currentTodo = "";
  let error = false;

  function addTodo() {
    error = false;
    if (!currentTodo) {
      error = true;
    } else {
      todoList = [...todoList, currentTodo];
      currentTodo = "";
    }
  }

  function editTodo(index) {
    let newTodoList = todoList.filter((val, i) => {
      return i !== index;
    });

    currentTodo = todoList[index];
    todoList = newTodoList;
  }

  function removeTodo(index) {
    let newTodoList = todoList.filter((val, i) => {
      return i !== index;
    });

    todoList = newTodoList;
  }
</script>

<div class="mainContainer">
  <div class="headerContainer">
    <h1 class="headerContainer">Todo List</h1>
    <div class="headerButtons">
        <button
        ><i class="fa-regular fa-floppy-disk"></i>
        <p>Save</p></button
      >
      <button
      ><i class="fa-solid fa-right-from-bracket"></i>
      <p>Logout</p></button
    >
    </div>

  </div>
  <main>
    {#if todoList.length === 0}
      <p>You have nothing to do!</p>
    {/if}
    {#each todoList as todo, index}
      <div class="todo">
        <p>
          {index + 1}. {todo}
        </p>
        <div class="actions">
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <i
            on:click={() => {
              editTodo(index);
            }}
            on:keydown={() => {}}
            class="fa-regular fa-pen-to-square"
          ></i>
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <i
            on:click={() => {
              removeTodo(index);
            }}
            on:keydown={() => {}}
            class="fa-regular fa-trash-can"
          ></i>
        </div>
      </div>
    {/each}
  </main>
  <div class={"enterTodo " + (error ? "errorBorder" : "")}>
    <input bind:value={currentTodo} type="text" placeholder="Enter todo" />
    <button on:click={addTodo}>ADD</button>
  </div>
</div>

<style>
  .mainContainer {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    gap: 24px;
    padding: 24px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }

  .headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .headerButtons {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .headerContainer button {
    background: #003c5b;
    color: white;
    padding: 10px 18px;
    border: none;
    border-radius: 4px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }

  .headerContainer button i {
    font-size: 1.1rem;
  }

  .headerContainer button:hover {
    opacity: 0.7;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  .todo {
    border-left: 1px solid cyan;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 1.3rem;
  }

  .actions i:hover {
    color: red;
  }

  .actions i {
    cursor: pointer;
  }

  .enterTodo {
    display: flex;
    align-items: stretch;
    border: 1px solid #0891b2;
    border-radius: 5px;
    overflow: hidden;
  }

  .errorBorder {
    border-color: red;
  }

  .enterTodo input {
    background: transparent;
    border: none;
    padding: 14px;
    color: white;
    flex: 1;
  }

  .enterTodo input:focus {
    outline: none;
  }

  .enterTodo button {
    padding: 0 28px;
    background: #003c5b;
    border: none;
    color: cyan;
    font-weight: 600;
  }
</style>
