let searchMiddle = true

// on page load
$(() => {

  // on loop click
  $('#searchSubmit').on('click', () => {
    search($('#searchField').val())
  })

  // on enter
  $('#search').on('keypress', (event) => {
    if(event.key == 'Enter') search($('#searchField').val())
  })
})


function search(input) {
  if(input == "") return
  if(searchMiddle) searchAnimation()
  $('#results').html('')
  
  // search and add new results
  if(searchMiddle) setTimeout(() => { search(input) }, 800)
  else searchSnippets(input)
}

function searchAnimation() {

  // remove title
  $('#title').animate({'top': '42%'}, 100, () => { $('#title').css('display', 'none')})

  // set search bar to corner
  $('#search').animate({'top': `-${window.innerHeight-100}px`, 'left': `-${window.innerWidth-600}px`}, 400, () => {

    // make results appear
    $('#results').animate({'height': '10px'}, 100)
    $('#results').animate({'width': `${window.innerWidth-200}px`, 'padding': '0 100'}, 300)
    $('#results').animate({'height': `${window.innerHeight-150}px`, 'padding': '50 100 0 100'}, 300, () => { 
      $('#results').css('height', 'auto')
      // if results does not reach bottom. Fill scren
      if(Number($('#results').css('height').replace('px', '')) < window.innerHeight-150) {
        $('#results').css('height', `${window.innerHeight-150}px`)
      }
    })
  })

  setTimeout(() => {searchMiddle = false}, 100)
}

function searchSnippets(input) {
  input = input.toLowerCase()
  let sortedSnippets = []
  // loop trough snippets
  for(let snippet of snippets) {
    let score = 0

    // loop trough keywords and give score
    for(let keyword of snippet.keywords) {
      if(input.includes(keyword)) score++
    }
    // give score if keywords include language
    if(input.includes(snippet.language)) score += 2
    
    snippet.score = score

    // add snippet to sortedSnippets
    sortedSnippets.push(snippet)

  }
  // sort sortedSnippets
  sortedSnippets.sort((a, b) => b.score-a.score)

  // Send first 10
  for(let i=0; i<100; i++) {
    if(sortedSnippets[i] == undefined) continue
    if(sortedSnippets[i].score == 0) continue
    sortedSnippets[i].num = i
    loadSnippet(sortedSnippets[i])
  }

  // log snippets
  console.log(sortedSnippets)

  // PrettyPrint all
  PR.prettyPrint()

  // If first result is score 0. No results
  if(sortedSnippets[0].score == 0) {
    $('#results').html(`<span class="snippetTitle">Coudnt find any snippets that match your input :(</span>`)
  }
}

function loadSnippet(snippet) {
  $('#results').append(`
  <div id="snippet-${snippet.num}">
    <span class="snippetTitle">${snippet.title}</span>
    <img class="copy" src="https://i.imgur.com/foup2zJ.png"/>
    <pre class="prettyprint snippetCode">${snippet.code}</pre>
  </div>
  `)
  let snippetCode = $(`#snippet-${snippet.num} > pre`)
  let codeHeight = Number(snippetCode.css('height').replace('px', ''))

  // if code too long. set height to 200px;
  if(codeHeight > 200) {
    snippetCode.css('height', '200px')

    // add expand button
    snippetCode.before('<img class="expand" src="https://i.imgur.com/tVKCyXJ.png"/>')

    // on expand button click
    $(`#snippet-${snippet.num} > .expand`).on('click', () => {
      let button = $(`#snippet-${snippet.num} > .expand`)
      // if already expanded. Collapse
      if(button.hasClass('expanded')) {
        button.removeClass('expanded')
        button.css('transform', 'rotate(0deg)')
        snippetCode.css('height', '200px')
      }
      // else expand
      else {
        button.css('transform', 'rotate(90deg)')
        button.addClass('expanded')
        snippetCode.css('height', 'auto')
      }
    })
  }

  // on copy button
  $(`#snippet-${snippet.num} > .copy`).on('click', () => {
    $('body').append(`<textarea id="temporarilyCopySpan">${snippet.code}</textarea>`)
    $('#temporarilyCopySpan').select()
    document.execCommand("copy")
    $('#temporarilyCopySpan').remove()

  })
}