// @cmlohr 2020

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
	{
		id: 1,
		text: 'Welcome to my hall of choices.  In a nondescript room, there lays a Redpill.  What do you do?',
		options: [
			{
				text: 'Ha!  You saw this movie!  Take the Redpill.',
				setState: { redPill: true },
				nextText: 2
			},
			{
				text: 'Leave the Redpill behind.',
				nextText: 2
			}
		]
	},
	{ 
		id: 2,
		text: 'You venture forth in foolish confidence.  There ahead is a kiosk, offering to trades for your precious Redpill.  There is only a small wooden cup and a dull key to trade for.',
		options: [
			{ 
				text: 'Trade the Redpill for the key.',
				requiredState: (currentState) => currentState.redPill,
				setState: { redPill: false, key: true },
				nextText: 3
			},
			{ 
				text: 'Trade the Redpill for the cup.',
				requiredState: (currentState) => currentState.redPill,
				setState: { redPill: false, cup: true },
				nextText: 3
			},
			{ 
				text: 'Pft this is weird.',
				nextText: 3
			}
		]
	},
	{ 	
		id: 3,
		text: 'Confident in your choice you move on to the next room.  In the next room you find three doors.',
		options: [
		{
			text: 'Door 1 is to your left, its a white door with cracked paint, it feels cold to the touch.',
			nextText: 4
		},
		{
			text: 'Door 2 appears to be freshly painted in blood.',
			nextText: 5
		},
		{
			text: 'Door 3 is old and wooden, it puts off the pungent oder of damp woods.',
			nextText: 6
		}
	]
},
{
	id: 4,
	text: 'You opened the wrong door and died a horrible, painful death.',
	options: [
		{
			text: 'Restart',
			nextText: -1
		}
	]
},
{
	id: 5,
	text: 'You fell into the gaping maw of Cthulu.  You died.',
	options: [
		{
			text: 'Restart',
			nextText: -1
		}
	]
},
{
	id: 6,
	text: 'Congrats, you survived to make future horrible choices!',
	options: [
		{
			text: 'Ahead of you there is a dusky hallway, nothing good can come of this.',
			nextText: 7
		}
	]
},
{
	id: 7,
	text: 'You follow the hallway, peeling wallpaper, creepy old portrates.  This place has the distinct feeling of wrong to it.  Ahead there is a door, and above the door is an angry nest of Murder Hornets!',
	options: [
		{
			text: 'Run!',
			nextText: 8
		},
		{
			text: 'Swallow the Redpill.',
			requiredState: (currentState) => currentState.redPill,
			nextText: 9
		},
		{ 
			text: 'Throw cup at nest.',
			requiredState: (currentState) => currentState.cup,
			nextText: 10
		},
		{
			text: 'Sneak toward the door, and use the key.',
			requiredState: (currentState) => currentState.key,
			nextText: 11
		}
	]
},
{ 
	id: 8,
	text: 'Lol, no outrunning Murder Hornest, ded.',
	options: [
		{
			text: 'Restart',
			nextText: -1
		}
	]
},
{
	id: 9,
	text: 'The Redpill was really just candy, tasty.  But you die anyway.',
	options: [
		{
			text: 'Restart',
			nextText: -1
		}
	]
},
{
	id: 10,
	text: 'You- you threw the cup at the hornest?! Ded.',
	options: [
		{
			text: 'Restart',
			nextText: -1
		}
	]
},
{	
	id: 11,
	text: 'Hmm, sneaky-sneaky.  Your cunning has paid off, you have escaped the hall of Murder Hornets!',
	options: [
		{
			text: 'Congrats!  Play Again?',
			nextText: -1
		}
	]
}
]
startGame()