const $input = document.querySelector('input');
const $button = document.querySelector('button');
const $answer = document.querySelector('.answer');

const data = [];

const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;


$button.addEventListener('click', e => {
  e.preventDefault();

  const Area = document.getElementById('Area').value;
  const type = document.getElementById('type').value;
  const Speies = document.getElementById('Speies').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  
  const question = `사는지역:${Area} 종류:${type} 종:${Speies} 성별:${gender} 을 감안하여 특징, 장,단점, 주의사항, 주변 놀곳 을 자세히 알려주세요.`


  data.push({
      "role": "user",
      "content": question,
  })

  chatGPTAPI()
})

function chatGPTAPI() {
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      redirect: 'follow'
  })
  
  .then(res => res.json())
  .then(res => {
      console.log(res.choices[0].message.content)
      localStorage.setItem("answer",res.choices[0].message.content)
      location.href="./nextpage.html"
  })
}