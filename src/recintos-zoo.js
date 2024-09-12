class RecintosZoo {

    static animais = [
        {
            nome: "LEAO",
            tamanho: 3,
            biomas: ["savana"],
            carnivoro: true
        },{
            nome: "LEOPARDO",
            tamanho: 2,
            biomas: ["savana"],
            carnivoro: true
        },{
            nome: "CROCODILO",
            tamanho: 3,
            biomas: ["rio"],
            carnivoro: true
        },{
            nome: "MACACO",
            tamanho: 1,
            biomas: ["savana", "floresta"],
            carnivoro: false
        },{
            nome: "GAZELA",
            tamanho: 2,
            biomas: ["savana"],
            carnivoro: false
        },{
            nome: "HIPOPOTAMO",
            tamanho: 4,
            biomas: ["savana", "rio"],
            carnivoro: false
        }
    ];

    static recintos = [
        {
          numero: 1,
          biomas: ["savana"],
          tamanho: 10,
          animaisExistentes: [
            {
              nome: "MACACO",
              quantidade: 3
            }
          ]
        },
        {
          numero: 2,
          biomas: ["floresta"],
          tamanho: 5,
          animaisExistentes: []
        },
        {
          numero: 3,
          biomas: ["savana", "rio"],
          tamanho: 7,
          animaisExistentes: [
            {
              nome: "GAZELA",
              quantidade: 1
            }
          ]
        },
        {
          numero: 4,
          biomas: ["rio"],
          tamanho: 8,
          animaisExistentes: [] 
        },
        {
          numero: 5,
          biomas: ["savana"],
          tamanho: 9,
          animaisExistentes: [
            {
              nome: "LEAO",
              quantidade: 1
            }
          ]
        }
    ];
    
    static getIndexAnimalValido(animal) {
        var index = 0;
        for(const a of RecintosZoo.animais){
            if(a.nome == animal) return index;
            index = index + 1;
        }
        return -1
    }

    analisaRecintos(animal, quantidade) {

        const indexNovoAnimal = RecintosZoo.getIndexAnimalValido(animal);
        if(indexNovoAnimal == -1){
            return {
                erro: "Animal inválido",
                recintosViaveis: false
            };
        }

        if(quantidade < 1){
            return {
                erro: "Quantidade inválida",
                recintosViaveis: false
            };
        }

        var saidaListaRecintos = [];

        for(const recinto of RecintosZoo.recintos){

            var espacoOcupado = 0;
            
            if(recinto.animaisExistentes.length > 0){
                const indexAnimalExistente = RecintosZoo.getIndexAnimalValido(recinto.animaisExistentes[0].nome);
                espacoOcupado = (RecintosZoo.animais[indexAnimalExistente].tamanho) * (recinto.animaisExistentes[0].quantidade);

                // verifica animais diferentes
                if(RecintosZoo.animais[indexAnimalExistente].nome != RecintosZoo.animais[indexNovoAnimal].nome){
                    espacoOcupado = espacoOcupado + 1;

                    // verifica carnivoros
                    if(RecintosZoo.animais[indexAnimalExistente].carnivoro || RecintosZoo.animais[indexNovoAnimal].carnivoro){
                        continue
                    }

                    // verifica biomas para hipopotamo com outra espécie
                    if(RecintosZoo.animais[indexAnimalExistente].nome == "HIPOPOTAMO" || RecintosZoo.animais[indexNovoAnimal].nome == "HIPOPOTAMO"){
                        if(!(recinto.biomas.includes("savana") && recinto.biomas.includes("rio"))) continue
                    }
                }
            } else {
                if(RecintosZoo.animais[indexNovoAnimal].nome == "MACACO" && quantidade == 1) continue
            }

            const tamanhoDisponivel = recinto.tamanho - espacoOcupado

            const tamanhoNovosAnimais = (RecintosZoo.animais[indexNovoAnimal].tamanho) * quantidade

            // verifica tamanho
            if(tamanhoDisponivel < tamanhoNovosAnimais) continue;

            // verifica bioma
            if(!recinto.biomas.some(bioma => RecintosZoo.animais[indexNovoAnimal].biomas.includes(bioma))) continue

            const espacoDisponivelAtualizado = tamanhoDisponivel - tamanhoNovosAnimais
            saidaListaRecintos.push("Recinto " + recinto.numero + " (espaço livre: " + espacoDisponivelAtualizado + " total: " + recinto.tamanho + ")")
        }

        if(saidaListaRecintos.length > 0){
            return {
                erro: false,
                recintosViaveis: saidaListaRecintos
            };
        } else {
            return {
                erro: "Não há recinto viável",
                recintosViaveis: false
            };
        }
        
    }

}

export { RecintosZoo as RecintosZoo };
