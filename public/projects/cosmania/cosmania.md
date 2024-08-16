<div className="my-class">
  This is some content with a custom class.
</div>

# Cosmania

**Start Date:** February 2023  
**End Date:** May 2023

[Watch Video](https://youtu.be/ZcUD4tmIc0k)  
_Video Excerpt:_ This video does not have audio

### 1. Core Game Mechanics

- **Interactable & Collectable GameObjects**: Demonstrate how players interact with and collect objects in the game. Highlight the interfaces and serializable structs used to manage these objects.

| ![GIF Cannon](./interact/interact%20cannon.gif) | ![GIF Couch](./interact/interact%20couch.gif) |
| :---------------------------------------------: | :-------------------------------------------: |
|             _interact with cannon_              |             _interact with couch_             |

| ![GIF Door](./interact/interact%20door.gif) | ![GIF Streetlamp](./interact/interact%20streetlamp.gif) |
| :-----------------------------------------: | :-----------------------------------------------------: |
|            _interact with door_             |               _interact with streetlamp_                |

- **Character Controllers & Cameras**: Show transitions between third-person, first-person, and stationary cameras, as well as character movement. This can include how the player character and NPCs interact within the environment.

| ![GIF first person](./camera/camera%20first%20person.gif) | ![GIF stationary](./camera/camera%20stationary.gif) |
| :-------------------------------------------------------: | :-------------------------------------------------: |
|                   _first person camera_                   |                 _stationary camera_                 |

### 2. User Interface (UI) Elements

- **Gameplay UI & Interactions**: Capture the UI in action during gameplay, such as chat bubbles, popups, inventory management, and warnings. This can also include tutorials or guides displayed during gameplay.

| ![GIF Gameplay Investigate](./gameplay/gameplay%20investigate.gif) | ![GIF Main Menu](./gameplay/gameplay%20main%20menu.gif) |
| :----------------------------------------------------------------: | :-----------------------------------------------------: |
|                       _Gameplay Investigate_                       |                       _Main Menu_                       |

- **UI Events & Feedback**: Demonstrate how the UI reacts to different game states or player actions, using popups, chat bubbles, or warnings as examples.

| ![PNG Exit](./ui/ui%20exit.png) | ![PNG Game Over](./ui/ui%20game%20over.png) |
| :-----------------------------: | :-----------------------------------------: |
|           _Exit Menu_           |              _Game Over Menu_               |

| ![PNG Setting](./ui/ui%20setting.png) | ![PNG Tutorial](./ui/ui%20tutorial.png) |
| :-----------------------------------: | :-------------------------------------: |
|            _Settings Menu_            |             _Tutorial Menu_             |

### 3. State Management

- **Finite State Machine (FSM)**: Show how the FSM manages NPC and player states. You could visualize state transitions for NPCs or the player, and how different states trigger specific behaviors or animations.

| ![GIF UI State Change](./ui/ui%20state%20change.gif) |
| :--------------------------------------------------: |
|                    _UI State FSM_                    |

#### State management

```csharp
using System;
using Unity.IO.LowLevel.Unsafe;
using UnityEngine;
using UnityEngine.Playables;

public class StateManager
{
    public IState initialState;
    public IState currentState;
    [HideInInspector] public string nameOfChangedDialogVariable;
    [HideInInspector] public Ink.Runtime.Object valueOfChangedDialogVariable;
    [HideInInspector] public bool dialogEnded = true;

    public StateManager(IState _initialState)
    {
        initialState = _initialState;
    }

    public void Start()
    {
        currentState = initialState;
        currentState.EnterState(this);
    }

    // Update is called once per frame
    public void Update()
    {
        if (currentState == null) return;
        currentState.UpdateState();
    }
    public void SwitchState(IState state)
    {
        currentState.ExitState();
        currentState = state;
        currentState.EnterState(this);
    }
}
```

- **Branching Story System**: Use GIFs to illustrate how choices lead to different outcomes within the story, affecting game state and character interactions.

[Story System](https://github.com/chnsteven/Cosmania/blob/main/Assets/Scripts/Manager/DialogManager.cs
