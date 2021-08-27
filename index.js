var app = new Vue({
    el: ' #app ',
    data: {
        especialidades: [],
        especialidades_: [],
        consultorios: [],
        _consultorios: [],
        results: []
    },
    mounted: async function() {
        let tmpEspecialidades = (await axios.get("./assets/jsons/listaEspecialidades.json ")).data;
        this.consultorios = (await axios.get("./assets/jsons/result.json ")).data;

        this.especialidades_ = tmpEspecialidades.map((it1) => {
            const id = it1.id;
            let tmpConsultorios = this.consultorios.map(it2 => {
                let tmp = it2.filter(it3 => it3.idServico == id);
                return tmp.length > 0 ? tmp : null;
            }).filter(it2 => it2 != null);

            it1.consultorios = tmpConsultorios[0] || [];
            return it1;
        }).filter(it1 => it1.consultorios.length > 0);
        this.especialidades = [...this.especialidades_];
        console.log(this.especialidades[1]);
        setTimeout(() => {
            let search = document.querySelector("#search");
            if (search) search.focus();
        }, 200);
    },
    methods: {
        toEndereco: (consultorio) => {
            //{{consultorio?.tipoLogradouro}} {{consultorio?.endereco}}, {{consultorio.numeroEndereco}}{{consultorio?.complemento?", " +consultorio?.complemento:" "}}
            // {{consultorio?.bairro}} - {{consultorio?.municipio}} - {{consultorio?.estado}}
            return `${consultorio.tipoLogradouro} ${consultorio.endereco},  ${consultorio.numeroEndereco}, ${consultorio.bairro}, ${consultorio.municipio} - ${consultorio.estado}
            `;
        },
        onSearch: _.debounce(function(event) {
            const val = (event.target.value || " ").trim().toLowerCase();
            // console.log(val);
            if (!val) {
                this.especialidades = [...this.especialidades_];
                return;
            }
            this.especialidades = this.especialidades_.filter(it => {
                return it.nome.trim().toLowerCase().indexOf(val) > -1;
            });
            window.document.body.scrollIntoView();

        }, 400)

    }
})