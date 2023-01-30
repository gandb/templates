using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TargetControler : MonoBehaviour
{

     private long mID = 0;
    [SerializeField] private GameObject receiver;
    [SerializeField] private bool visible = false;
    private MeshRenderer mMeshRender;

    private void Start()
    {
        mID = IDGenerator.NextID();
        mMeshRender = this.gameObject.GetComponent<MeshRenderer>();

    }

    private void Update()
    { 
        if (visible && !mMeshRender.enabled)
        {
            
            mMeshRender.enabled = true;
        }
        else if (!visible && mMeshRender.enabled)
        {
            mMeshRender.enabled = false;
        }
    }

    private void OnCollisionEnter(Collision collision)
    {
        TargetCollision targetCollision = new TargetCollision { Collision=collision, TargetID = mID};
        receiver.SendMessage("OnTargetCollision", targetCollision,SendMessageOptions.DontRequireReceiver);
    }
}
