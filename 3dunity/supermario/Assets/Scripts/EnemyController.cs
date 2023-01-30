using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyController : WaypointerFollow
{

    private bool mDie = false;
    private DateTime mDieDateTime ;


    public override void Update()
    {
        base.Update();

        if (mDie)
        {
            DieAnimationStop();
        }
    }

    private void DieAnimationStop()
    {
        DateTime now = DateTime.Now;
        int seconds = (int)Math.Truncate (Math.Abs((this.mDieDateTime- now).TotalSeconds));
        if (seconds > 5)
        {
            Destroy(this. gameObject);
        }
    }

    public void OnTargetCollision(TargetCollision targetCollision)
    {
        if (targetCollision.Collision.gameObject.tag.Contains("Player") && !mDie)
        {
            this.OnDie();
        }

    }

    private void OnDie()
    {
        this.mDie = true;
        this.mDieDateTime = DateTime.Now;

        Rigidbody rigidbody = gameObject.GetComponent<Rigidbody>();
        Collider colider = gameObject.GetComponent<Collider>();

        colider.enabled = false;

        rigidbody.AddForce(new Vector3(35, 180, 150));
    }
}
     
