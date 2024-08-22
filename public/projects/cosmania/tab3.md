### 3. State Management

- **Finite State Machine (FSM)**: Show how the FSM manages NPC and player states. You could visualize state transitions for NPCs or the player, and how different states trigger specific behaviors or animations.

| ![GIF UI State Change](/projects/cosmania/ui/ui%20state%20change.gif) |
| :-------------------------------------------------------------------: |
|                            _UI State FSM_                             |

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
