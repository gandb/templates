using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CharacterControllerHandler : MonoBehaviour
{
    const float JUMP_HEIGHT = 5;
    const float MOVE_FORCE = 650;

    CharacterController mCharacterController;

    // Start is called before the first frame update
    void Start()
    {
        mCharacterController = GetComponent<CharacterController>();
        mCharacterController.detectCollisions = true;
       
        Debug.Log("Hellow from Start");
    }

    // Update is called once per frame
    void Update()
    {
        float deltaTime = Time.fixedDeltaTime;

        float horizontalAxis = Input.GetAxis("Horizontal");
        float verticalAxis = Input.GetAxis("Vertical");

        if (Input.GetButtonDown("Jump"))
        { 
            mCharacterController.Move(new Vector3(0, JUMP_HEIGHT , 0));
        }
      

    }
}
