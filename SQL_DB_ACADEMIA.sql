/*
create table Pessoa (  
CPF varchar(11),  
Nome varchar(30) not null,  
Telefone varchar(10),  
Nascimento date,  
Sexo varchar(1),  
Rua varchar(30),  
Numero varchar(5),  
Cidade varchar(30),  
Estado varchar(2),  
Logradouro varchar(30),
CONSTRAINT PESSOA_PK PRIMARY KEY (CPF)
);

create table Personal (   
CPF varchar(11),   
Graduação varchar(30),   
Instituição_Ensino varchar(30),   
Admissão date,
PRIMARY KEY (CPF),
constraint Personal_CPF_fk FOREIGN KEY (CPF) references Pessoa(CPF)
)

create table Aluno (   
CPF varchar(11),   
Taxa_Gordura float(3,2),   
Altura float(3,2),   
Peso float(3,2),
Primary key (CPF),
constraint Aluno_CPF_fk FOREIGN KEY (CPF) references Pessoa(CPF)   
)

create table Folha_Ponto (   
CPF varchar(11),   
Dia date unique,   
Entrada date,   
Saida date,
constraint Folha_ponto_fk foreign key (CPF) references Personal(CPF)
)

create table Exercicio (  
Codigo int(3),  
Nome varchar(30),  
Repetições int(3),  
Carga int(3),  
Descrição varchar(30),
primary key (Codigo)
)

create table Avalia (   
CPF_Personal varchar(11), 
CPF_Aluno varchar(11),   
Codigo int(3),
constraint Avalia_Personal_CPF_fk foreign key (CPF_Personal) references Personal(CPF),
constraint Avalia_Aluno_CPF_fk foreign key (CPF_Aluno) references Aluno(CPF),
constraint Avalia_Codigo_Exercicios_fk foreign key (Codigo) references Exercicio(codigo)
)

create table Musculo (    
Codigo int(3),   
Nome varchar(30),    
Codigo_Exercicio int(3),   
Tipo varchar(30),
primary key (Codigo),
constraint Codigo_Exercicio_fk foreign key (Codigo_Exercicio) references Exercicio(codigo)
)

create table Maquina (    
Codigo int(3),   
Nome varchar(30),    
Codigo_Exercicio int(3),   
Aquisição date,
primary key (Codigo),
constraint Codigo_Exercicio_Maquina_fk foreign key (codigo_exercicio) references Exercicio(codigo)
)

create table Empresa (   
CNPJ varchar(11),  
Nome varchar(30),   
Telefone varchar(10),
primary key (CNPJ)
)

create table Manutenção (   
CNPJ varchar(11),  
Codigo_Maquina int(11),   
Dia date,  
Valor varchar(10),
constraint Manutencao_CNPJ_fk foreign key (CNPJ) references Empresa(CNPJ),
constraint Manutenção_Codigo_Maquina_fk foreign key (Codigo_Maquina) references Maquina(Codigo)
)
*/