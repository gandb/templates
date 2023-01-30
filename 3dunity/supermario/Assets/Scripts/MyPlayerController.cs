using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MyPlayerController : MonoBehaviour
{
    [SerializeField] private float jumpHeight = 5; 
    [SerializeField] private LayerMask groundLayer;
    public float moveForce = 200;
    private Rigidbody mActiveRigidBody;
    private GameObject groundCheck;
     private bool mDeath = false;
    private bool mDeathAnimation = false;
    private float jumpToDieHeight = 10;  
    private int mjumps;
     
    void Start()
    {
        mActiveRigidBody = GetComponent<Rigidbody>();
        groundCheck = new GameObject("GroundCheck");
        groundCheck.transform.SetParent(transform);
        Collider colider = GetComponent<Collider>();

        Vector3 pos = colider.bounds.center;
        pos.y = colider.bounds.min.y;
        groundCheck.transform.position = pos;
 
        Debug.Log("Hellow from Start");
    }
     
    private void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.tag.Contains("Enemy"))
        { 
                mDeath = true; 
        }
    }

    void Update()
    {
        if (mDeath)
        {
            if (!mDeathAnimation)
            {
                mDeathAnimation = true;
                mActiveRigidBody.velocity = new Vector3(mActiveRigidBody.velocity.x, jumpToDieHeight, mActiveRigidBody.velocity.z);
                mActiveRigidBody.freezeRotation = false;;
                mActiveRigidBody.detectCollisions = false;
            }
            this.gameObject.transform.rotation =  new Quaternion(this.gameObject.transform.rotation.x, 
                this.gameObject.transform.rotation.y+0.05f, this.gameObject.transform.rotation.z, this.gameObject.transform.rotation.w);
            return;
        }
        MovePlayer();
    }

    private void MovePlayer( )
    {
        float deltaTime = Time.fixedDeltaTime;
        float horizontalAxis = Input.GetAxis("Horizontal");
        float verticalAxis = Input.GetAxis("Vertical");

        if (Input.GetButtonDown("Jump"))
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
        return  Physics.CheckSphere(groundCheck.transform.position, 0.1f,groundLayer);
    }
}
