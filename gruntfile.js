module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /* PARA FAZER A CONFIGURAÇÕES DOS PLUGINS, USAR OS CÓDIGOS ABAIXO (PRECISAM SER CARREGADOS ANTES) */
        less:{  // CONFIGURAÇÃO LESS
            development:{   // development é o ambiente padrão -  Criado por que pode ser criado configurações diferentes devido ao ambiente que for executado 
                files:{
                    'main.css' : 'main.less'
                }
            },
            productions:{   // Criado para o ambiente de produção onde o site irá rodar para o usuário final
                options:{
                    compress: true  // Para comprimir o código
                },
                files:{
                    'main.min.css' : 'main.less'
                }
            }
        },
        sass:{  // CONFIGURAÇÃO SASS
            dist:{
                options:{
                    style: 'compressed'  // Para comprimir o código
                },
                files:{
                    'main2.css' :  'main.scss'
                }
            }
        },
        concurrent:{  // CONFIGURAÇÃO CONCURRENT - USADO PARA FAZER TAREFAS PARALELAS
            target: ['olaGrunt', 'less', 'sass', 'tarefaDemorada']
        },
        watch:{ // CONFIGURAÇÃO WATCH - USADO PARA ASSISTIR AS ATUALIZAÇÕES
            less:{
                files: ['source/styles/**/*.less'],
                tasks: ['less:development']
            },
            html:{
                files: ['source/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace:{   // CONFIGURAÇÃO REPLACE - USADO PARA FAZER SUBSTITUIÇÃO NO ARQUIVO HTML
            dev:{
                options:{
                    patterns: [{
                        match: 'ENDERECO_DO_CSS',  // COLOCAR NO HTML NA PASTA SOURCE @@ENDERECO_DO_CSS NO LINK DO CSS
                        replacement: './styles/main.css'
                    },
                    {
                        match: 'ENDERECO_DO_JS',  // COLOCAR NO HTML NA PASTA SOURCE @@ENDERECO_DO_JS NO SCRIPT SRC
                        replacement: '../source/scripts/main.js'
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['source/index.html'],
                    dest: 'dev/'
                }]
            },
            dist:{  // CONFIGURAÇÃO HTMLMIN - USADO PARA MINIFICAR O HTML DA PASTA DIST
                options:{
                    patterns:[{
                        match: 'ENDERECO_DO_CSS',
                        replacement: './styles/main.min.css'
                    }]
                },
                files:[{
                    expand: true,
                    flatten: true,
                    src: ['prebuild/index.html'],
                    dest: 'dist/'
                }]
            }
        },
        htmlmin:{  // CONFIGURAÇÃO HTMLMIN - USADO PARA MINIFICAR O HTML DA PASTA DIST
            dist:{
                options:{
                    removeComments: true,  // REMOVE COMENTÁRIOS
                    collapseWhitespace: true   // REMOVE ESPAÇO EM BRANCO
                },
                files:{
                    'prebuild/index.html' : 'source/index.html'  // USADO PARA CRIAR A PASTA PREBUILD E MINIFICAR O INDEX.HTML
                }
            }
        },
        clean:['prebuild']  // CONFIGURAÇÃO CLEAN - USADO PARA APAGAR A PASTA PREBUILD
    })

    /* EXEMPLO DE TAREFA */
    // grunt.registerTask('olaGrunt', function(){
    //     console.log('Olá grunt');
    // })

    // grunt.registerTask('olaGrunt', function(){
    //     setTimeout(function(){
    //         console.log('Olá grunt');
    //     }, 3000);
    // })

    // grunt.registerTask('olaGrunt', function(){
    //     const done = this.async();
    //     setTimeout(function(){
    //         console.log('Olá grunt');
    //     }, 3000);
    // })

    // grunt.registerTask('tarefaDemorada', function(){
    //     const done = this.async();
    //     setTimeout(function(){
    //         console.log('Tchau Grunt');
    //     }, 7000);
    // })

    /* PARA FAZER O CARREGAMENTO DOS PLUGINS, USAR OS CÓDIGOS ABAIXO */
    grunt.loadNpmTasks('grunt-contrib-less'); // utilizar o nome do plugin - (npm install --save-dev grunt-contrib-less)
    grunt.loadNpmTasks('grunt-contrib-sass'); // utilizar o nome do plugin - (npm install --save-dev grunt-contrib-sass)
    grunt.loadNpmTasks('grunt-concurrent'); // utilizar o nome do plugin - (npm install --save-dev grunt-concurrent)
    grunt.loadNpmTasks('grunt-contrib-watch'); // utilizar o nome do plugin - (npm install --save-dev grunt-contrib-watch)
    grunt.loadNpmTasks('grunt-replace'); // utilizar o nome do plugin - (npm install --save-dev grunt-replace)
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); // utilizar o nome do plugin - (npm install --save-dev grunt-contrib-htmlmin)
    grunt.loadNpmTasks('grunt-contrib-clean'); // utilizar o nome do plugin - (npm install --save-dev grunt-contrib-clean)

    /* PARA CRIAR A TAREFA PADRÃO, UTILIZAR O CÓDIGO ABAIXO */
    // grunt.registerTask('default', ['concurrent'])

    /* PARA DESMEMBRAR A COMPILAÇÃO DO LESS PARA QUE 0 productions SEJA EXECUTADO APENAS NO AMBIENTE DE PRODUÇÃO */
    // Colocar o comando "build": "build" no arquivo package.json
    /* grunt.registerTask('default', ['less:development']); */  // SERÁ ALTERADO PARA WATCH (VER ABAIXO)
    grunt.registerTask('default', ['watch']);
    // grunt.registerTask('build', ['less:productions']);
    // grunt.registerTask('build', ['less:productions', 'htmlmin:dist', 'replace:dist']);
    grunt.registerTask('build', ['less:productions', 'htmlmin:dist', 'replace:dist', 'clean']);
}
