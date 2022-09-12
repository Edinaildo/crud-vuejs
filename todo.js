var app = new Vue({
  el: "#app",
  data: {
    message: "Olá Vue!",
    tasks: [],
    modoAdicionar: false,
    pesquisa: "",
    taskForm: {},
    textFilter: "",
    criacao: {
      title: "",
      dueTo: null,
      project: "",
      usuario: "",
    },
  },

  methods: {
    getTasks() {
      fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((tarefasJson) => {
          console.log(tarefasJson);
          this.tasks = tarefasJson;
        });
    },
    adicionar() {
      this.taskForm.id = null;
      this.taskForm.title = null;
      this.taskForm.dueTo = null;
      this.taskForm.project = null;
      this.taskForm.usuario = null;
      this.modoAdicionar = true;
    },
    editar(tarefaId) {
      console.log(tarefaId.id);
      const tarefa = this.tasks.filter((t) => t.id == tarefaId.id)[0];
      this.taskForm.id = tarefa.id;
      this.taskForm.title = tarefa.title;
      console.log(tarefaId.id);
    },
    salvar() {
      fetch(
        "http://localhost:3000/tasks",
        {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(this.criacao),
        },
        (this.modoAdicionar = false)
      ).then(() => {
        this.getTasks();
      });
    },
    deletar(id) {
      fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
      this.getTasks();
    },
  },

  created() {
    console.log("created");
    this.getTasks();
  },
  computed: {
    filterTask() {
      return this.tasks.filter((el) =>
        el.title.toLowerCase().includes(this.textFilter.toLowerCase())
      );
    },
  },

  mounted() {
    console.log("montend");
  },
});
