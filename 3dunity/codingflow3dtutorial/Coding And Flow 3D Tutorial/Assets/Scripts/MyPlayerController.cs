using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MyPlayerController : MonoBehaviour
{
    [SerializeField] float jumpHeight = 5;
    public float moveForce = 200;

    private Rigidbody mActiveRigidBody;

    [SerializeField] Transform groundCheck;

    [SerializeField] LayerMask groundLayer;

    private int mjumps;

    // Start is called before the first frame update
    void Start()
    {
        mActiveRigidBody = GetComponent<Rigidbody>();
        Debug.Log("Hellow from Start");
    }

    // Update is called once per frame
    void Update()
    {
         

        float deltaTime = Time.fixedDeltaTime;
        float horizontalAxis = Input.GetAxis("Horizontal");
        float verticalAxis = Input.GetAxis("Vertical");

        if (Input.GetButtonDown("Jump") )
        {
            if (IsGrounded())
            {
                mjumps = 0;
            }

            mjumps++;
            if (mjumps <= 2)
            {
                mActiveRigidBody.velocity = new Vector3(mActiveRigidBody.velocity.x, jumpHeight, mActiveRigidBody.velocity.z);
            }
        }
              
          


        
        mActiveRigidBody.velocity = new Vector3(deltaTime * moveForce * horizontalAxis, mActiveRigidBody.velocity.y, deltaTime * moveForce * verticalAxis);
        

    }

    public bool IsGrounded()
    {
        return Physics.CheckSphere(groundCheck.position, 0.1f,groundLayer);
    }
}
