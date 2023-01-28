import * as React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';

import './style.css';

export default function App() {
  return (
    <>
      <b>USE STATE React Hook</b>
      <p> </p>
      <ContadorUS />
      <p>....</p>
      <Counter />
      <p>....</p>
      <Name />
      <p>....</p>
      <b>USE EFFECT React Hook</b>
      <p> Veja tbem o console</p>
      <ContadorUE />
      <p>....</p>
      <b>USE CALLBACK React Hook</b>
      <ContadorCB />
      <p>....</p>
      <b>USE MEMO React Hook</b>
      <ContadorUM />
    </>
  );
}

//USESTATE REACT HOOK
// Usando o component CustomButton como contador
// Inicialmente o contador aparece só no console.log e não na tela
// pq ele precisa ser reenderizado
// O useState que é uma função
//  - vai renderizar o componente qdo o estado formodificado
// só pra testa - vc passa o valor inicial eg: useState(0)
// ele retorna um array - Só pra testar isso veja useState(0).map
// voce pode fazer a desestruturalização de um array de
// const count = useState(0) para const [count, setcount] = useState(0)
// [primeira posição do array, segundo valor do array]
// o segunda valor do array (dispatch)
// vai ser uma função que alterar o valor da primeira posição eg: setCount
// O setState (setCount etc) vai alterar o valor daquela propridade
// e toda aquela função vai se realizar de novo.

// COMPONENT COM USESTATE
const ContadorUS: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>Contador = {count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
          console.log(count);
        }}
      >
        Add
      </button>
    </>
  );
};

// Second compponet

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>Segundo Contador: {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};

// third component

const Name = () => {
  const [name, setName] = useState('React');

  return (
    <div>
      Hello {name}
      <button
        onClick={() => (name === 'React' ? setName('Hooks') : setName('React'))}
      >
        Change State
      </button>
    </div>
  );
};

// USEEFFECT REACT HOOK - (15:28)
// Hook de efeitos colaterais. É uma função.
// - Pode ser usado para qdo agente inicializa o componente
// - Ou quando agente altera algo do componente
// - no VScode, mostra que é uma arrow function que precisa passar (EffectCallback)
// precisa receber 1 ou 2 argumentos
// outro parameto p/ passar é o deps (é uma lista dependências ou underfined)
// Não necesariamente precisa informar ARRAY DE DEPENDÊNCIA[].
//  - Mas nesse caso pode ficar executando o tempo todo.
//  - se passar para o contador setCount(count + 1)
//  - ele vai contar infinitamente
//  - é só adicionar o array de dependências vazio que ele para , []
// Vai ser muito usado pra fazer consultas em um banco de dados
// - e trazer informações do backend (eg: setCount(10))
// - eg: o contador tá armazenado no servidor e precisamos do valor certo
//    do useState do contador e altera para o valor correto dele.
// Vai dar problema se passar para o contador setCount(count + 1)
// Ele só vai executar novamente depois que o [count]
// - dentro do array de dependências for alterado.

// COMPONENT COM USEEFFECT
// Eg: quando eu quiser fazer efeitos em cima de um tipo de interação
const ContadorUE: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Contador X2 = ' + count * 2);
  }, [count]);

  return (
    <>
      <div>Contador = {count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add
      </button>
    </>
  );
};

//USECALLBACK REACT HOOK (25:37)
// o calback tem o poder me memorizar a função que tá resetando o valor p/ 0
// sem deixar que esse valor faça o que faça
// por exemplo. Qdo o código é renderizado e encontra códigos como exemplo:
// let contatador2 = 0;   ou
// const somar = () => setCount{ count + 1}
// Ela vai retornar a mesma função que passamos para o parameto.
//  -   Veja (T) no VSCode da funcão useCallback
// passa arrow function (1 parametro) e deps [] array de dependência
// Ela serve então para armazenar a nossa função memória
//  - para que ela não seja construída toda vez que temos
//  - um novo fluxo de render (p/ reaproveitar essa função várias vezes)
// Vai ser útil qdo tiver que passar esses parâmetos p/ os componentes
// Veja exemplos e complicações (29:40???) - Sem o array de dependência
//  - ele tá armazenando e somando 0+1 - não está pegando o valor antigo
// Usamos essa função p/ ser passada p/ funções para dentro de componentes

// Próximo - Se não quiser reconstruir a função sempre. O que fazer? (31:22)
// Temos que somar de uma forma correta com arrow function eg:
//   - setCount( () => { OldCount})  e return oldCount + 1;
//   - assim pode passar uma função e passar o state s/ array de dependência
// assim:
// const somar = useCallback(() => {
//   setCount((oldCount) => {
//     return oldCount + 1;
//   });
//   }, []);
// O somar inicializa o useCallback
// IMPORTANTE
// veja explicação de tudo (32:20)
// O const = somar do useCallback é como o valor do useState(0) na memoria ////  - Ele só vai alterar isso
//  - quando o array de dependência for alterado [] - Assim,
//  - Ele destroi o que tinha na memoria qdo usa-se o array de dependência []
//  - e reconstroi tudo com o novo valor.
// Cuidado se tiver 2 useStates.
// Só da pra pegar o valor do state que faz o set
// Talvez precise colocar o valor no array de dependência
// Não dá pra recuperar o valor de outros estados caso eles foram alterados

// COMPONENT COM CALLBACK
const ContadorCB: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Contador X2 = ' + count * 2);
  }, [count]);

  const somar = useCallback(() => {
    setCount((oldCount) => {
      return oldCount + 1;
    });
  }, []);

  return (
    <>
      <div>Contador = {count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add
      </button>
    </>
  );
};

//USE MEMO REACT HOOK (33:37)
// Você guarda uma função na memoria. Praticamente o mesmo como o useCallback
// Pode ente-lo como um computed value
// É uma função também que recebe 2 parmetos:       Exemplo:

// const countx2 = useMemo(() => {
//   return count * 2
// }, []);

// Qdo iniciar o fluxo de render do código -
// - O userEffect roda.
// - O useCallback guarda a função na memória
// - E o useMemo vai executar a função e guardar o valor da função na memória
// - ele vai guardar o count * 2 !!!!
// - ele não refletir o número na tela se não iniciar o array de dependência
// - resumindo, o useMemo é um valor computado!!!!
// - lembre que toda vez que alterar o valor do [] dependência, muda o valor
// - Se quiser para de retornar é tirar tirar o cont do []
// Outra idéia seria solucionar o problema com uma lista de objetos
// - pode ajudar em fazer transformação de dados (37:42)
// - uma lista com os atributos errados.
// - retorna objeto [] ao invés de numérico

const ContadorUM: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Contador X2 = ' + count * 2);
  }, [count]);

  const somar = useCallback(() => {
    setCount((oldCount) => {
      return oldCount + 1;
    });
  }, []);

  const countx2 = useMemo(() => {
    return count * 2;
  }, [count]);

  return (
    <>
      <div>Contador = {count}</div>
      <div>Contador X2 = {countx2}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add
      </button>
    </>
  );
};

// Notas extras ------------------------
// Os components de classes não são mais usados e eles não precisariam dos Hooks

// EXEMPLO DE COMPONENTE SEM USESTATE
// -Inicialmente o contador aparece só no console.log e não na tela
// -pq ele precisa ser reenderizado
// -O useState vai renderizar o componente qdo o estado é modificado
// EXEMPLO DE SIMPLE COMPONENTE SEM O USESTATE
const Contador3: React.FC = ({}) => {
  let count3 = 0;

  return (
    <>
      <div>Contador1 = {count3}</div>
      <button
        onClick={() => {
          count3++;
          console.log(count3);
        }}
      >
        Somar
      </button>
    </>
  );
};

// COMPONENT COM USESTATE BASIC SAMPLE
// A maioria das vezes esse o useState hook vai ser usado assim:

const ContadorUSSample: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>Contador = {count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
          console.log(count);
        }}
      >
        Add
      </button>
    </>
  );
};

// COMPONENT COM USE CALBACK BASIC SAMPLE
const ContadorCBSample: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Contador X2 = ' + count * 2);
  }, [count]);

  const somar = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <>
      <div>Contador = {count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add
      </button>
    </>
  );
};
