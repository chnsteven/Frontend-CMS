#### 1. Core Game Mechanics

- **Interactable & Collectable GameObjects**: This is how players interact with and collect objects in the game. I managed these obejct with serializable structs.

|                      _Interact with cannon_                      |                     _Interact with couch_                      |
| :--------------------------------------------------------------: | :------------------------------------------------------------: |
| ![GIF Cannon](/projects/cosmania/interact/interact%20cannon.gif) | ![GIF Couch](/projects/cosmania/interact/interact%20couch.gif) |

|                     _Interact with door_                     |                        _Interact with streetlamp_                        |
| :----------------------------------------------------------: | :----------------------------------------------------------------------: |
| ![GIF Door](/projects/cosmania/interact/interact%20door.gif) | ![GIF Streetlamp](/projects/cosmania/interact/interact%20streetlamp.gif) |

- **Character Controllers & Cameras**: These are the transitions between third-person, first-person, and stationary cameras, as well as character movement. The camera switches depending on how the player character and NPCs interact within the environment.

|                           _First person camera_                            |                         _Stationary camera_                          |
| :------------------------------------------------------------------------: | :------------------------------------------------------------------: |
| ![GIF first person](/projects/cosmania/camera/camera%20first%20person.gif) | ![GIF stationary](/projects/cosmania/camera/camera%20stationary.gif) |
